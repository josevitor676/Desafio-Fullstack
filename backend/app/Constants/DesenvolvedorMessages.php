<?php

namespace App\Constants;

class DesenvolvedorMessages
{
    public const DESENVOLVEDOR_NAO_ENCONTRADO = 'Desenvolvedor não encontrado.';
    public const NOME_OBRIGATORIO = 'Campo Nome é obrigatório!';
    public const NOME_STRING = 'Campo Nome deve ser uma string!';
    public const NOME_MAX = 'Campo Nome deve ter no máximo 255 caracteres!';
    public const NOME_JA_EXISTE = 'Já existe um Desenvolvedor com esse nome.';
    public const SEXO_OBRIGATORIO = 'Campo Sexo é obrigatório!';
    public const SEXO_DEVE_SER = 'Campo Sexo deve ser M ou F!';
    public const DATA_NASCIMENTO_OBRIGATORIO = 'Campo Data de Nascimento é obrigatório!';
    public const DATA_NASCIMENTO_DATE_FORMAT = 'Campo Data de Nascimento deve estar no formato Y-m-d!';
    public const HOBBY_OBRIGATORIO = 'Campo Hobby é obrigatório!';
    public const HOBBY_STRING = 'Campo Hobby deve ser uma string!';
    public const NIVEL_ID_OBRIGATORIO = 'Campo Nivel ID é obrigatório!';
    public const NIVEL_ID_EXISTS = 'Campo Nivel ID não existe na tabela niveis!';
}
