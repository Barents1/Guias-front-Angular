import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Importar BsDatepickerModule
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar BrowserAnimationsModule

// Routes
import { APP_ROUTING } from './app.routes';

// services

//components
import { AppComponent } from './app.component';
import { SharedComponent } from './components/shared/shared.component';
import { HomeComponent } from './components/home/home.component';
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

@NgModule({
  declarations: [
    AppComponent,
    SharedComponent,
    HomeComponent,
    FacturaComponent,
    GuiaComponent,
    PagosComponent,
    GuiasComponent,
    BuscarComponent,
    FacturadetalleComponent,
    GenerarfacturaComponent,
    FacturasComponent,
    HomepagosComponent,
    RealizarpagosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
