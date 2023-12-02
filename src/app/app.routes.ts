import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { FacturaComponent } from './components/factura/factura.component';
import { GuiaComponent } from './components/guia/guia.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { GuiasComponent } from './components/guias/guias.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { FacturadetalleComponent } from './components/facturadetalle/facturadetalle.component';
import { GenerarfacturaComponent } from './components/generarfactura/generarfactura.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { HomepagosComponent } from './components/homepagos/homepagos.component';
import { RealizarpagosComponent } from './components/realizarpagos/realizarpagos.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'factura', component: FacturaComponent},
    // { path: 'crearFactura', component: GenerarfacturaComponent},
    { path: 'factura/:id', component: FacturadetalleComponent},
    { path: 'Facturas', component: FacturasComponent},
    { path: 'crearFactura/:factura_id', component: GenerarfacturaComponent},
    { path: 'guia/:guia_id', component: GuiaComponent},
    { path: 'guias', component: GuiasComponent},
    { path: 'homepagos', component: HomepagosComponent},
    { path: 'realizar-pago/:pago_id', component: RealizarpagosComponent},
    { path: 'pagos', component: PagosComponent},
    { path: 'buscar/:texto', component: BuscarComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES)