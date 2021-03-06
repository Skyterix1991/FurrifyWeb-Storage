import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {KEYCLOAK_AUTH_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM} from "./shared/config/api.constants";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import * as fromApp from './store/app.reducer';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {PostsEffects} from "./posts/store/posts.effects";
import {HttpClientModule} from "@angular/common/http";
import {PostCreateEffects} from "./posts/post-create/store/post-create.effects";
import {ArtistsEffects} from "./artists/store/artists.effects";

function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: KEYCLOAK_AUTH_URL,
                realm: KEYCLOAK_REALM,
                clientId: KEYCLOAK_CLIENT_ID,
            },
            initOptions: {
                pkceMethod: "S256",
                onLoad: 'check-sso',
                silentCheckSsoRedirectUri:
                    window.location.origin + '/assets/silent-check-sso.html',
            },
            enableBearerInterceptor: true,
            bearerExcludedUrls: ['/assets', '/auth/login'],
            loadUserProfileAtStartUp: true
        }).catch(error => console.error('[Error] Keycloak init failed', error));
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        KeycloakAngularModule,
        StoreModule.forRoot(fromApp.appReducerMap),
        EffectsModule.forRoot([
            PostsEffects,
            PostCreateEffects,
            ArtistsEffects
        ]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        HttpClientModule
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
