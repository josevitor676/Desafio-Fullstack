<?php

namespace App\Http\Requests;

use App\Constants\NiveisMessages;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class NiveisPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'erros' => $validator->errors(),
        ], 400));
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nivel' => 'required|string|max:255|unique:niveis,nivel',
        ];
    }

    public function messages(): array
    {
        return [
            'nivel.required' => NiveisMessages::NIVEL_OBRIGATORIO,
            'nivel.string' => NiveisMessages::NIVEL_STRING,
            'nivel.max' => NiveisMessages::NIVEL_MAX,
            'nivel.unique' => NiveisMessages::NIVEL_JA_EXISTE,
        ];
    }
}
