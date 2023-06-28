import type { AppProps } from 'next/app'
//import { appStoreWrapper } from "../lib/store/store"
import { appStoreWrapper } from "../lib/store/store"

export function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
export default appStoreWrapper.withRedux(MyApp);
