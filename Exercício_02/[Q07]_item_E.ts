function cumprimentar(nome: string | null)
    {
        // Sem strictNullChecks, isso não geraria um erro
        console.log("Olá, " + nome.toUpperCase());
    }

cumprimentar("João"); // Funciona normalmente
cumprimentar(null); // Gera um erro em tempo de compilação com strictNullChecks ativado
