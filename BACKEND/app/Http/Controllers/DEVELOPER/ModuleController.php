<?php

namespace App\Http\Controllers\developer;

use Illuminate\Http\Request;
use App\Services\ModuleService;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateModuleRequest;
use App\Http\Requests\UpdateModuleRequest;
use App\Http\Requests\CreateModuleItemRequest;
use App\Http\Requests\UpdateModuleItemRequest;
use App\Services\ModuleItemService;

class ModuleController extends Controller
{
    public function __construct(
        protected ModuleService $moduleService,
        protected ModuleItemService $moduleItemService,
    ) {}

    public function createModule(CreateModuleRequest $request)
    {
        $user = auth('sanctum')->user();
        $module = $this->moduleService->createModule(array_merge($request->validated(), ['user_id' => $user->id]));
        return response()->json(['message' => 'Module created successfully', 'module' => $module], 201);
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

    public function fetchModuleItem($item_id)
    {
        $item = $this->moduleItemService->getModuleItemById($item_id);
        return response()->json($item, 200);
    }

    public function createModuleItem(CreateModuleItemRequest $request)
    {
        $user = auth('sanctum')->user();
        $this->moduleItemService->createModuleItem(array_merge($request->validated(), ['user_id' => $user->id]));
        return response()->json(['message' => 'Module item created successfully'], 200);
    }

    public function editModuleItem(UpdateModuleItemRequest $request, $item_id)
    {
        $this->moduleItemService->updateModuleItem($item_id, $request->validated());
        return response()->json(['message' => 'Module item updated successfully'], 200);
    }

    public function deleteModuleItem($item_id)
    {
        $this->moduleItemService->deleteModuleItem($item_id);
        return response()->json(['message' => 'Module item deleted successfully'], 200);
    }
}
