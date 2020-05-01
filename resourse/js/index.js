//confirmar si se puede usar serviceWorker
if( navigator.serviceWorker ){
    console.log('podemos usarlo');
    navigator.serviceWorker.register('../sw.js')

}

