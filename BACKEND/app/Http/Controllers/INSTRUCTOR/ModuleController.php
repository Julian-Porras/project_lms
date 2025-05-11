<?php

namespace App\Http\Controllers\instructor;

use App\Models\ModuleModel;
use Illuminate\Http\Request;
use App\Models\ModuleItemModel;
use App\Services\ModuleService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class ModuleController extends Controller
{
    public function __construct(
        protected ModuleService $moduleService,
    ) {}

    public function fetchClassModuleItem($item_id)
    {
        $item = $this->moduleService->getModuleItemById($item_id);
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
        }
        try {
            $this->moduleService->createModule($request, $user->id);
            return response()->json(['message' => 'Module created successfully'], 201);
        } catch (\Exception $e) {
            // return response()->json(['error' => $e], 500);
            return response()->json(['error' => 'Failed to create classroom'], 500);
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
        }
        try {
            $this->moduleService->updateModule($module_id, $request);
            return response()->json(['message' => 'Module updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update module'], 500);
        }
    }
    public function deleteModule($module_id)
    {
        try {
            $this->moduleService->deleteModule($module_id);
            return response()->json(['message' => 'Module deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete module'], 500);
        }
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
        }
        try {
            $this->moduleService->createModuleItem($request, $user->id);
            return response()->json(['message' => 'Module item created successfully'], 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Failed to create module item'], 500);
        }
    }
    public function editModuleItem(Request $request, $item_id)
    {
        $validator = Validator::make($request->all(), [
            'item_name'     => 'required',
            'item_type'     => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        try {
            $this->moduleService->updateModuleItem($item_id, $request);
            return response()->json(['message' => 'Module item updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update module item'], 500);
        }
    }
    public function deleteModuleItem($item_id)
    {
        try {
            $this->moduleService->deleteModuleItem($item_id);
            return response()->json(['message' => 'Module item deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete module item'], 500);
        }
    }
}
