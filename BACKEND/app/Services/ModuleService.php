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
}
