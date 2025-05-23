<?php

namespace App\Http\Requests\DesenvolvedorRequest;

use App\Constants\DesenvolvedorMessages;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DesenvolvedorPatchRequest extends FormRequest
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
            'nome' => 'sometimes|string|max:255|unique:desenvolvedores,nome,' . $this->route('id'),
            'sexo' => 'sometimes|in:M,F',
            'data_nascimento' => 'sometimes|date_format:Y-m-d',
            'hobby' => 'sometimes|string|max:255',
            'nivel_id' => 'sometimes|exists:niveis,id',
        ];
    }
    public function messages(): array
    {
        return [
            'nome.string' => DesenvolvedorMessages::NOME_STRING,
            'nome.max' => DesenvolvedorMessages::NOME_MAX,
            'nome.unique' => DesenvolvedorMessages::NOME_JA_EXISTE,
            'sexo.in' => DesenvolvedorMessages::SEXO_DEVE_SER,
            'data_nascimento.date_format' => DesenvolvedorMessages::DATA_NASCIMENTO_DATE_FORMAT,
            'hobby.string' => DesenvolvedorMessages::HOBBY_STRING,
            'nivel_id.exists' => DesenvolvedorMessages::NIVEL_ID_EXISTS,
        ];
    }
}
