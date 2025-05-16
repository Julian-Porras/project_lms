<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            'username'              => 'required|string|max:255',
            'first_name'            => 'required|string|max:255',
            'last_name'             => 'required|string|max:255',
            'email_address'         => 'required|email|max:255|unique:users,email_address',
            'password'              => 'required|min:8',
            'password_confirmation' => 'required|same:password',
            'contact_number'        => 'nullable',
            'role_id'               => 'required|exists:tbl_roles,id',
        ];
    }
}
