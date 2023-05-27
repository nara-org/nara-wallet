
import {i18n} from '../locales/i18n'

import {isValidAddress} from '../public/walletCommon'
export default {
    amount: (value: string) => /^\d+(\.\d{1,8})?$/.test(value) || i18n.global.t('rules.amount'),
    validAddress: (value: string) => isValidAddress(value) || i18n.global.t('rules.validAddress'),
}