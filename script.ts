import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const Projeto = [
        {
            id: 1,
            nome: "Projeto A",
            area: "Tecnologia"
        },
        {
            id: 2,
            nome: "Projeto B",
            area: "Medicina"
        },
    ]
    
    for(const data of Projeto){
        const Projeto = await prisma.projeto.create({
            data: data,
        });
    }

    const Aluno = [
        {
            nome: "João da Silva",
            matricula: 12345,
            id_projeto: 1,
          },
        {
            nome: "José de Oliveira",
            matricula: 12346,
            id_projeto: 2,
          }
          
    ]
    for(const data of Aluno){
        const Aluno = await prisma.aluno.create({
            data: data,
        });
    }

    const Avaliacao = [
        {            
            datahora: "2023-10-21T10:00:00Z",
            criterio: "Avaliação de Desempenho",
            nota: 8.5,
            id_avaliador: 67890
        }
    ]
    for(const data of Avaliacao){
        const Avaliacao = await prisma.avaliacao.create({
            data: data,
        })
    }

    const Professor = [
        {
            nome: "Professora Maria",
            matricula: 67890
        } 
    ]

    for(const data of Professor){
        const Professor = await prisma.professor.create({
            data: data,
        })
    }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })