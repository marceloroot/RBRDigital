import app from '../infra/http/expres-adapter'; // Corrigido o caminho do import
import { connectToMongoDB } from '../infra/repositoreDataBase/connect'; // Corrigido o caminho do import

const port = parseInt(process.env.APP_PORT as string) || 3002;


// Conectar ao MongoDB pode desacoplar mais
connectToMongoDB()
  .then(() => {
    // Iniciar o servidor Express somente após a conexão com o MongoDB ser estabelecida
    app.listen(port, () => {
      console.log('\x1b[33m%s\x1b[0m', `=> 🚀 Server running on the port: ${port}`);
    });
  })
  .catch((error: any) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    // Se houver erro na conexão com o MongoDB, talvez você queira encerrar o aplicativo aqui
    process.exit(1); // Encerra o processo com código de erro
  });
