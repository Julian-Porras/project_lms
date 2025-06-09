<?php

namespace App\Services;

use App\Models\ModuleItemModel;

class ModuleItemService
{
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
