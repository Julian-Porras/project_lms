<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateClassRequest extends FormRequest
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
            'user_id'           => 'nullable',
            'course_id'         => 'required',
            'classroom_name'    => 'required',
            'classroom_code'    => 'required|unique:classrooms,classroom_code',
        ];
    }
    public function messages(): array
    {
        return [
            'classroom_code.unique' => 'The classroom code is invalid.',
        ];
    }
}
