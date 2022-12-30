// começamos importando os decorators necessários do typeorm:
// Entity, para criar uma classe com o decorator
// E alguns decorators que representam colunas de tabelas como
// o Column, o mais básico
// e o PrimaryColumn, que usaremos para gerar o ID do nosso usuário
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";

// também importamos aqui o uuid
import { v4 as uuid } from "uuid"
import { Cart } from "./cart.entity";

// usamos o decorator Entity
@Entity()
// declaramos a classe já exportando ela com o export
// pois ela será usada em outros lugares na aplicação
export class User {
		
    // criamos a primeira coluna que será um uuid,
    // e também aproveitamos para usar o type dessa coluna como uuid
    // passando o argumento "uuid", que por baixo dos panos, avisa
    // pro banco que essa coluna irá guardar strings no formato
    // de uuid 
    @PrimaryColumn('uuid')
		
    // usamos o readonly aqui, pois uma vez criado, um id de usuário
    // jamais poderá ser alterado.
    readonly id: string;

    // e então criamos as nossas duas colunas de nome e email usando
    // o Column e declarando elas como strings
    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToOne((type) => Cart, {
        eager: true
    })@JoinColumn()
    cart: Cart

    // aqui, definimos no contrutor da classe a geração automática
    // dos Ids, basicamente, qualquer instância dessa classe será criada
    // com um id totalmente único
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}