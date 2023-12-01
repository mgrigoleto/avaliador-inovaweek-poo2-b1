import { PrismaClient } from '@prisma/client'
import AlunoServices from './services/AlunoServices'
import ProfessorServices from './services/ProfessorServices'
import ProjetoServices from './services/ProjetoServices'
import AvaliacaoController from './controllers/AvaliacaoController'
import AvaliacaoServices from './services/AvaliacaoServices'

const prisma = new PrismaClient()

async function main() {

  // CRIAR OS USUÁRIOS

  const alunoA = await AlunoServices.createAluno({
    nome: 'Martin Burguer King',
    matricula: 123456789
  })

  const alunoB = await AlunoServices.createAluno({
    nome: 'Donald Trampolim',
    matricula: 987698765
  })

  const alunoC = await AlunoServices.createAluno({
    nome: 'Barack Ibama',
    matricula: 145234612
  })

  const alunoD = await AlunoServices.createAluno({
    nome: 'Albert Eyes 10',
    matricula: 1523526212
  })

  const alunoE = await AlunoServices.createAluno({
    nome: 'Joe Buy Them',
    matricula: 1553434534
  })



  // CRIAR OS PROFESSORES

  const profA = await ProfessorServices.createProf({
    nome: 'Subzero',
    matricula: 456456456
  })

  const profB = await ProfessorServices.createProf({
    nome: 'Reptile',
    matricula: 4646452324
  })

  const profC = await ProfessorServices.createProf({
    nome: 'Scropion',
    matricula: 256264234
  })

  const profD = await ProfessorServices.createProf({
    nome: 'Rain',
    matricula: 252631223
  })

  const profE = await ProfessorServices.createProf({
    nome: 'Smoke',
    matricula: 890876784
  })



  // PROJETOS

  const projA = await ProjetoServices.createProj({
    nome: 'Saúde é o que interessa',
    area: 'Saúde e Lazer'
  })

  const projB = await ProjetoServices.createProj({
    nome: 'Not a Bitcoin farmer',
    area: 'Inovação e Tecnologia'
  })

  const projC = await ProjetoServices.createProj({
    nome: 'Tomate seco',
    area: 'Gastronomia'
  })



  // AVALIAÇÕES

  const avaliacaoA = await AvaliacaoServices.createAval({
    datahora: new Date('2023-12-25'),
    criterio: 'Vasco = 10',
    nota: 10,
    avaliadorProfessor: { connect: { matricula: 890876784 } }
  });
  
  const avaliacaoB = await AvaliacaoServices.createAval({
    datahora:  new Date('2023-12-27'),
    criterio: '7 = 10',
    nota: 7,
    avaliadorAluno: { connect: { matricula: 123456789 } }
  })

  const avaliacaoC = await AvaliacaoServices.createAval({
    datahora:  new Date('2023-12-31'),
    criterio: 'Se tem botão é sistema',
    nota: 1000,
    avaliadorAluno: { connect: { matricula: 1553434534 } }
  })
 
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