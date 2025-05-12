<?php

namespace App\Services;

use App\Models\ModuleModel;
use App\Models\ModuleItemModel;

class ModuleService
{
    public function createModule($request)
    {
        return ModuleModel::create($request->all());
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
    public function createModuleItem($request)
    {
        return ModuleItemModel::create($request);
    }
    public function updateModuleItem($item_id, $request)
    {
        $module_item = ModuleItemModel::find($item_id);
        return $module_item->update($request);
    }
    public function deleteModuleItem($item_id)
    {
        return ModuleItemModel::where('id', $item_id)->delete();
    }
}
