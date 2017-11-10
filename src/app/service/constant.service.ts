import { Http, Response, RequestOptions, Headers } from '@angular/http';

export class ConstantService {       
    public static JSON_HEADER =         
        {       
            headers: new Headers(
            {                    
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type',
            }), 
        }; 
}
