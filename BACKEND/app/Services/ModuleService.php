<?php

namespace App\Services;

use App\Models\ModuleModel;
use App\Models\ModuleItemModel;

class ModuleService
{
    public function createModule($request, $user_id)
    {
        return ModuleModel::create([
            'user_id'       => $user_id,
            'classroom_id'  => $request->classroom_id,
            'module_name'   => $request->module_name,
            'is_visible'    => $request->is_visible,
        ]);
    }
    public function updateModule($module_id, $request)
    {
        return ModuleModel::where('id', $module_id)->update([
            'module_name'   => $request->module_name,
            'is_visible'    => $request->is_visible,
        ]);
    }
    public function deleteModule($module_id)
    {
        return ModuleModel::where('id', $module_id)->delete();
    }
    public function getModuleItemById($item_id)
    {
        return ModuleItemModel::where('id', $item_id)->first()->load('module:module_name');
    }
    public function createModuleItem($request, $user_id)
    {
        return ModuleItemModel::create([
            'user_id'       => $user_id,
            'classroom_id'  => $request->classroom_id,
            'module_id'     => $request->module_id,
            'item_name'     => $request->item_name,
            'item_type'     => $request->item_type,
        ]);
    }
    public function updateModuleItem($item_id, $request)
    {
        return ModuleItemModel::where('id', $item_id)->update([
            'item_name'     => $request->item_name,
            'item_type'     => $request->item_type,
        ]);
    }
    public function deleteModuleItem($item_id)
    {
        return ModuleItemModel::where('id', $item_id)->delete();
    }
}
