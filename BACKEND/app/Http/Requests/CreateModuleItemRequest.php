<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateModuleItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'course_id'     => 'nullable',
            'classroom_id'  => 'nullable',
            'module_id'     => 'required',
            'item_name'     => 'required',
            'item_type'     => 'required',
            'item_content'  => 'nullable',
            'is_visible'    => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'item_name.required'    => 'The Content name field is required.',
            'item_type.required'    => 'The Content type field is required.',
            'is_visible.required'   => 'The Content visibility field is required.',
        ];
    }
}
