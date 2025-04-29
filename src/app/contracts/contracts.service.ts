import { Injectable } from '@angular/core';

import { DUMMY_CONTRACTS } from '../../dummy_data';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  get contracts() {
    return DUMMY_CONTRACTS;
  }
}
