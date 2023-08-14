
class CaixaDaLanchonete {


    cardapio = [
        { codigo: "cafe", descricao: 'Café', valor: 30000, acrescimo: false },
        { codigo: "chantily", descricao: 'Chantily (extra do Café)', valor: 15000, },
        { codigo: "suco", descricao: 'Suco Natural', valor: 62000, acrescimo: false },
        { codigo: "sanduiche", descricao: 'Sanduíche', valor: 65000, acrescimo: false },
        { codigo: "queijo", descricao: 'Queijo (extra do Sanduíche)', valor: 20000, },
        { codigo: "salgado", descricao: 'Salgado', valor: 72500, acrescimo: false },
        { codigo: "combo1", descricao: '1 Suco e 1 Sanduíche', valor: 95000, },
        { codigo: "combo2", descricao: '1 Café e 1 Sanduíche', valor: 75000, }
    ];

    verificarMetodoDePagamento(metodoDePagamento) {
        //Verificando se o método de pagamento é válido
        const pagamentoValido = ["dinheiro", "debito", "credito"];
        if (!pagamentoValido.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!"
        };
    };

    verificarCarrinhoVazio(itens) {
        //Verificando se o carrinho está vazio
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!"
        }
    };

    //Verificando se a quantidade é válida
    verificarQuantidadeValida(itens) {

        const verificarQuantidade = itens.some((item) => {
            const [itemDoPedido, quantidadeString] = item.split(',')
            let quantidade = parseInt(quantidadeString)
            return quantidade === 0
        });

        if (verificarQuantidade) {
            return 'Quantidade inválida!'
        }
    };

    //Verificando se o item é válido
    verificarItemValido(itens) {
        let itemInvalido = false

        for (let itemPedido of itens) {
            const [nomeDoItem] = itemPedido.split(',')
            const temNoCardapio = this.cardapio.find((produto) => {
                return produto.codigo === nomeDoItem
            });

            if (temNoCardapio === undefined) {
                itemInvalido = true
            }
        };

        if (itemInvalido) {
            return `Item inválido!`
        }
    };
    //Verificando se o item extra tem seu respectivo item principal no carrinho
    verificarItemExtra(itens) {
        let listaDoPedido = []

        for (let itemPedido of itens) {
            const [nomeDoItem] = itemPedido.split(',')
            listaDoPedido.push(nomeDoItem)
        }

        if (listaDoPedido.includes('chantily') && !listaDoPedido.includes('cafe')) {
            return 'Item extra não pode ser pedido sem o principal'
        }

        if (listaDoPedido.includes('queijo') && !listaDoPedido.includes('sanduiche')) {
            return 'Item extra não pode ser pedido sem o principal'
        }
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        let valorTotal = 0
        let valorTotalString = ''
        
        const erroItemExtra = this.verificarItemExtra(itens)
        const erroCarrinhoVazio = this.verificarCarrinhoVazio(itens)
        const erroQuantidadeInvalida = this.verificarQuantidadeValida(itens)
        const erroItemInvalido = this.verificarItemValido(itens)
        const erroMetodoDePagamento = this.verificarMetodoDePagamento(metodoDePagamento)
        

        for (let itemDoPedido of itens) {
            let [nomeDoItem, quantidadeString] = itemDoPedido.split(',')
            let valorDoitem = 0
            let quantidade = parseInt(quantidadeString)

            for (itens of this.cardapio) {
                if (itens.codigo === nomeDoItem) {
                    valorDoitem = itens.valor
                }
            }
            valorTotal += (valorDoitem *= quantidade)
        }
        
        //Aplicando Desconto
        if(metodoDePagamento === 'dinheiro'){
            valorTotal  = valorTotal *0.95
        }

        if(metodoDePagamento === 'credito'){
            valorTotal = valorTotal*1.03
        }

        valorTotal = (valorTotal / 10000)


        //Retornando as mesnsagens de erro e o valor total
        if (erroItemExtra || erroCarrinhoVazio || erroQuantidadeInvalida || erroItemInvalido || erroMetodoDePagamento)  {
            return (erroItemExtra || erroCarrinhoVazio || erroQuantidadeInvalida || erroItemInvalido || erroMetodoDePagamento)
        } else {
            valorTotalString = valorTotal.toFixed(2).replace('.', ',')}
            return `R$ ${valorTotalString}`

        }

    };

export { CaixaDaLanchonete };
