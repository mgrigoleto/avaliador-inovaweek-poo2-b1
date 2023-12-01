import express from 'express';
import MainRouter from './routes/MainRouter';
import AlunoRouter from './routes/AlunoRouter';
import AvaliacaoRouter from './routes/AvaliacaoRouter';
import ProjetoRouter from './routes/ProjetoRouter';
import ProfessorRouter from './routes/ProfessorRouter';

const app = express();
const port = 3000;

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(MainRouter);
app.use(AlunoRouter);
app.use(AvaliacaoRouter);
app.use(ProjetoRouter);
app.use(ProfessorRouter);

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})