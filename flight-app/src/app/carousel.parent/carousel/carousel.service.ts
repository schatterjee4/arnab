/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';


import { Result } from './models/result.model';
import { Blob } from './models/blob.model';
import { EnumerationResults } from './models/enumerationResults.model'

@Injectable()
export class CarouselService {

    constructor(private http: HttpClient, private transformProvider: TransformProvider) { }

    get(container: string): Observable<string[]> {
        return this.http.get(environment.blobStorage.concat(container, '?restype=container&comp=list'), { responseType: 'text' })
            .pipe(
                map((xml: string) => this.transformProvider.convertToJson<EnumerationResults>(xml).EnumerationResults.Blobs.Blob
                    .map((azureBlob: Blob) => azureBlob.Url))
            );
    }
}*/