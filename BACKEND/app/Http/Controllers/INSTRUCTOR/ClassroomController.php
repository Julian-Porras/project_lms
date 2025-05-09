<?php

namespace App\Http\Controllers\instructor;

use App\Enums\PaginateEnum;
use App\Http\Controllers\Controller;
use App\Models\ClassroomModel;
use Illuminate\Http\Request;

class ClassroomController extends Controller
{
    public function fetchClasses(Request $request)
    {
        $search = trim($request->search);
        $limit = trim($request->limit);
        $status = strtolower($request->status);
        $user = auth('sanctum')->user();
        $classes = ClassroomModel::when($search, function ($query) use ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('classroom_name', 'like', "%{$search}%");
            });
        })
            ->when($status, function ($query, $status) {
                if ($status == 'all') return $query;
                $query->where('status', $status);
            })
            ->where('users_id', $user->id)
            ->paginate($limit ?? PaginateEnum::FIVE->value);
        return response()->json($classes, 200);
    }
    
}
