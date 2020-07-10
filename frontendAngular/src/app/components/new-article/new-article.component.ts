import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article.service';
import { Global } from '../../services/global';
import swal from 'sweetalert';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
  providers: [ArticleService],
})
export class NewArticleComponent implements OnInit {
  public article: Article;
  public status: string;
  public pageTitle: string;
  public isEdit: boolean;

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png, .gif, .jpeg',
    maxSize: '50',
    uploadAPI: {
      url: Global.url + 'uploadImage',
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Subir imagen',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit',
    },
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', null, null);
    this.pageTitle = 'Crear artículo';
    this.isEdit = false;
  }

  ngOnInit(): void {}

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.status = 'success';
          this.article = response.article;

          swal(
            'Artículo creado',
            'El artículo se ha creado correctamente',
            'success'
          );

          this._router.navigate(['/blog']);
        } else {
          this.status = 'error';
        }
      },
      (err) => {
        console.log(err);
        this.status = 'error';
      }
    );
  }

  uploadImage(data) {
    let image = data.body.image;
    this.article.image = image;
  }
}
