import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  
  //Decorador @Catch() que marca la clase como un filtrador de excepciones
  @Catch()
  export class AllExceptionFilter implements ExceptionFilter {
    //Loget para registrar los errores
    private readonly logger = new Logger(AllExceptionFilter.name);
  
    // Método que se ejecuta cuando ocurra una excepción en la aplicación
    // Parametro exception es la excepcion que se ocurrida y host es el
    //contexto de la solicitud
    catch(exception: any, host: ArgumentsHost) {
      //Obtener el contexto de la petición HTTP con el switchToHttp()
      const ctx = host.switchToHttp();
      //Response y request de la petición
      const response = ctx.getResponse();
      const request = ctx.getRequest();
  
      //Estado de la respuesta dependiendo de si la excepción es una
      //instancia de HttpException, si no asigna INTERNAL_SERVER_ERROR
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      //Se obtiene el mensaje de error de la exceptión, nuevamente dependiendo
      //de si la excepción es una instancia de HttpException o no
      const msg = exception instanceof HttpException ? exception.getResponse() : exception;

      //Reistra el error con el loger, tanto el estado como el mensaje
      this.logger.error(`Status: ${status}, Error: ${JSON.stringify(msg)}`);
  
      //Devuelve la respuesta json con el estado, fecha y la respuesta json
  
      response.status(status).json({
        time: new Date().toISOString(),
        path: request.url,
        error: msg,
      });
    }
  }
  