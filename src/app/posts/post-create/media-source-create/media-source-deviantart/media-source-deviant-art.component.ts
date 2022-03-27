import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../store/app.reducer";
import {updateSourceData} from "../../store/post-create.actions";

@Component({
    selector: 'app-media-source-deviant-art',
    templateUrl: './media-source-deviant-art.component.html',
    styleUrls: ['./media-source-deviant-art.component.css']
})
export class MediaSourceDeviantArtComponent implements OnInit {

    mediaSourceForm!: FormGroup;

    constructor(private store: Store<fromApp.AppState>) {
    }

    ngOnInit(): void {
        this.mediaSourceForm = new FormGroup({
            deviationId: new FormControl(null, [Validators.required])
        });
    }

    onChange(): void {
        let id = this.mediaSourceForm.controls.deviationId.value;
        // If id is empty set it to null to prevent form from being valid
        if (id === "") {
            id = null;
        }

        this.store.dispatch(updateSourceData({
            data: {
                id: id
            }
        }));
    }
}
