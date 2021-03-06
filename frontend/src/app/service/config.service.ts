import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

  private _api_url = '/api'

  private _refresh_token_url = this._api_url + '/refresh';

  private _login_url = this._api_url + '/login';

  private _register_url = this._api_url + '/register';

  private _postjob_url = this._api_url + '/job';

  private _logout_url = this._api_url + '/logout';

  private _change_password_url = this._api_url + '/changePassword';

  private _whoami_url = this._api_url + '/whoami';

  private _user_url = this._api_url + '/user';

  private _users_url = this._user_url + '/all';

  private _reset_credentials_url = this._user_url + '/reset-credentials';

  private _foo_url = this._api_url + '/foo';

  private _posted_job = this._api_url + '/company-home';

  private _user_profile = this._api_url + '/user/profile/';

  private _recommended_jobs = this._api_url + '/user/jobs';

  private _search_jobs = this._api_url + '/search/jobs';

  private _get_company = this._api_url + '/company/';

  private _apply_url = this._api_url + '/apply';

  private _get_applicants = this._api_url + '/job/'

  get reset_credentials_url(): string {
      return this._reset_credentials_url;
  }

  get refresh_token_url(): string {
      return this._refresh_token_url;
  }

  get whoami_url(): string {
      return this._whoami_url;
  }

  get users_url(): string {
      return this._users_url;
  }

  get login_url(): string {
      return this._login_url;
  }

  get register_url(): string {
    return this._register_url;
  }

  get postjob_url(): string {
    return this._postjob_url;
  }

  get logout_url(): string {
      return this._logout_url;
  }

  get change_password_url(): string {
      return this._change_password_url;
  }

  get foo_url(): string {
      return this._foo_url;
  }

  get posted_job(): string {
      return this._posted_job;
  }

  get user_profile(): string {
    return this._user_profile;
  }

  get recommended_jobs(): string {
      return this._recommended_jobs;
  }

  get search_jobs(): string {
      return this._search_jobs;
  }

  get get_company(): string {
      return this._get_company;
  }

  get apply_url(): string {
      return this._apply_url;
  }

  get get_applicants(): string {
      return this._get_applicants;
  }
}
