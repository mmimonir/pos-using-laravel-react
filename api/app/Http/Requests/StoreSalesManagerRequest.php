<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;


class StoreSalesManagerRequest extends FormRequest
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
            'address' => 'required|string|min:3|max:255',
            'area_id' => 'required|numeric',
            'district_id' => 'required|numeric',
            'division_id' => 'required|numeric',
            'email' => 'required|email',
            'name' => 'required|min:3|max:255',
            'bio' => 'max:1000',
            'landmark' => 'required',
            'photo' => 'required',
            'nid_photo' => 'required',
            'phone' => 'required|numeric',
            'shop_id' => 'required|numeric',
            'nid' => 'required',
            'password' => [
                'required', Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
        ];
    }
}
