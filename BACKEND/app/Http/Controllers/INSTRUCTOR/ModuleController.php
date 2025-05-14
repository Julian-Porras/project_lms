<?php

namespace App\Http\Controllers\instructor;

use Illuminate\Http\Request;
use App\Services\ModuleService;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateModuleItemRequest;
use App\Http\Requests\CreateModuleRequest;
use App\Http\Requests\UpdateModuleItemRequest;
use App\Http\Requests\UpdateModuleRequest;

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

    public function createModule(CreateModuleRequest $request, $class_id)
    {
        $user = auth('sanctum')->user();
        $this->moduleService->createModule(array_merge($request->validated(), ['user_id' => $user->id, 'classroom_id' => $class_id]));
        return response()->json(['message' => 'Module created successfully'], 201);
    }

    public function editModule(UpdateModuleRequest $request, $module_id)
    {
        $this->moduleService->updateModule($module_id, $request->validated());
        return response()->json(['message' => 'Module updated successfully'], 200);
    }

    public function deleteModule($module_id)
    {
        $this->moduleService->deleteModule($module_id);
        return response()->json(['message' => 'Module deleted successfully'], 200);
    }

    public function createModuleItem(CreateModuleItemRequest $request, $class_id)
    {
        $this->moduleService->createModuleItem(array_merge($request->validated(), ['classroom_id' => $class_id]));
        return response()->json(['message' => 'Module item created successfully'], 200);
    }

    public function editModuleItem(UpdateModuleItemRequest $request, $item_id)
    {
        $this->moduleService->updateModuleItem($item_id, $request->validated());
        return response()->json(['message' => 'Module item updated successfully'], 200);
    }

    public function deleteModuleItem($item_id)
    {
        $this->moduleService->deleteModuleItem($item_id);
        return response()->json(['message' => 'Module item deleted successfully'], 200);
    }
}
