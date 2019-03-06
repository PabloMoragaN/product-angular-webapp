import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../../services/productos.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../../services/global';

@Component({

    selector: 'productos-add',
    templateUrl: '../views/productos-add.html',
    providers: [ProductoService]
})

export class ProductoAddComponent {
    public titulo: string;
    public producto: Producto;
    public filesToUpload;
    public resultUpload;

    constructor(private _serviceProductoService: ProductoService, private _route: ActivatedRoute, private _router: Router) {
        this.titulo = 'Crear Productos';
        this.producto = new Producto(0, "", "", 0, "");

    }


    ngOnInit() {
        console.log(`Se ha cargado el componente ${this.titulo}`);

    }

    onSubmit() {
        console.log(this.producto);
        if (this.filesToUpload && this.filesToUpload.length >= 1) {
            this._serviceProductoService.makeFileRequest(GLOBAL.url + 'upload-file', [], this.filesToUpload).then((result) => {
                this.resultUpload=result;
                this.producto.imagen = this.resultUpload.filename;
                this.saveProducto();
            },

                (error) => {
                    console.log(error);
                });
        } else {
            this.saveProducto();

        }
    }


    saveProducto() {
        this._serviceProductoService.addProducto(this.producto).subscribe(
            result => {

                if (result.code == 200) {
                    this._router.navigate(['/productos']);
                } else {
                    console.log(result);
                }
            },
            error => {
                console.log(<any>error);
            }
        );

    }


    

    fileChangeEvent(fileInput: any) {

        this.filesToUpload = <Array<File>>fileInput.target.files;
        console.log(this.filesToUpload);
    }



}

