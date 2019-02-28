
//ids of all coins filtered
export const crypto_type_ids = (state = {"coins":[], "tokens":[]}, action) => {
  switch(action.type){
    case 'SET_CRYPTO_TYPE_IDS' : return action.cryptoTypeIds;
    default : return state
  }
}
