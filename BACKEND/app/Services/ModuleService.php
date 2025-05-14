<?php

namespace App\Services;

use App\Models\ModuleModel;
use App\Models\ModuleItemModel;

class ModuleService
{
    public function createModule(array $data)
    {
        return ModuleModel::create($data);
    }
    public function updateModule($module_id, array $data)
    {
        return ModuleModel::where('id', $module_id)->update($data);
    }
    public function deleteModule($module_id)
    {
        return ModuleModel::where('id', $module_id)->delete();
    }
    public function getModuleItemById($item_id)
    {
        return ModuleItemModel::where('id', $item_id)->first()->load('module:module_name');
    }
    public function createModuleItem(array $data)
    {
        return ModuleItemModel::create($data);
    }
    public function updateModuleItem($item_id, array $request)
    {
        $module_item = ModuleItemModel::find($item_id);
        return $module_item->update($request);
    }
    public function deleteModuleItem($item_id)
    {
        return ModuleItemModel::where('id', $item_id)->delete();
    }
}
