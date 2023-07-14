import type {LedgerStream} from "xrpl/dist/npm/models/methods/subscribe";
import type {Transaction} from "xrpl/dist/npm/models/transactions/transaction"
import type {Amount} from "xrpl/dist/npm//models/common";
import type {AccountTxRequest, AccountTxResponse, TxResponse} from "xrpl/dist/npm/models/methods";
import type {IssuedCurrencyAmount} from "xrpl/dist/npm/models/common";
import type {TrustSet} from "xrpl/dist/npm/models/transactions/trustSet";

type AccountTransaction = AccountTxResponse['result']['transactions'];
type TxResult = TxResponse['result'];
type Web3StatusType = 'init' | 'wait' | 'success' | 'error' | 'install';
export type {
    LedgerStream,
    Transaction,
    Web3StatusType,
    Amount,
    AccountTxRequest,
    TxResponse,
    AccountTxResponse,
    AccountTransaction,
    TxResult,
    IssuedCurrencyAmount,
    TrustSet,
}