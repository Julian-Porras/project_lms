<?php

namespace App\Http\Controllers\instructor;

use App\Models\ModuleModel;
use Illuminate\Http\Request;
use App\Models\ModuleItemModel;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ModuleController extends Controller
{
    public function fetchClassModuleItem($item_id)
    {
        $item = ModuleItemModel::where('id', $item_id)
            ->first()->load('module:module_name');
        return response()->json($item, 200);
    }
    public function createModule(Request $request)
    {
        $user = auth('sanctum')->user();
        $validator = Validator::make($request->all(), [
            'classroom_id'  => 'required',
            'module_name'   => 'required',
            'is_visible'    => 'required|boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            ModuleModel::create([
                'user_id'       => $user->id,
                'classroom_id'  => $request->classroom_id,
                'module_name'   => $request->module_name,
                'is_visible'    => $request->is_visible,
            ]);
            return response()->json(['message' => 'Module created successful'], 200);
        }
    }
    public function editModule(Request $request, $module_id)
    {
        $validator = Validator::make($request->all(), [
            'module_name'   => 'required',
            'is_visible'    => 'required|boolean',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            ModuleModel::where('id', $module_id)->update([
                'module_name'   => $request->module_name,
                'is_visible'    => $request->is_visible,
            ]);
            return response()->json(['message' => 'Module updated successful'], 200);
        }
    }
    public function deleteModule($module_id)
    {
        ModuleModel::where('id', $module_id)->delete();
        return response()->json(['message' => 'Module deleted successful'], 200);
    }
    public function createModuleItem(Request $request)
    {
        $user = auth('sanctum')->user();
        $validator = Validator::make($request->all(), [
            'classroom_id'  => 'required',
            'module_id'     => 'required',
            'item_name'     => 'required',
            'item_type'     => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        } else {
            ModuleItemModel::create([
                'user_id'       => $user->id,
                'classroom_id'  => $request->classroom_id,
                'module_id'     => $request->module_id,
                'item_name'     => $request->item_name,
                'item_type'     => $request->item_type,
            ]);
            return response()->json(['message' => 'Module item created successful'], 200);
        }
    }
}
