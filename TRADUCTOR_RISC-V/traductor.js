
function divisionDelaFrases(CadenadeEntrada)
{
    let [tipodeOperacion, direcciones] = CadenadeEntrada.split(' ',2);
    return [tipodeOperacion, direcciones];
}

function detectarTipodeOperacpion( operacionEntrada)
{
    if(operacionEntrada == 'sub')
    {
        return 1;
    }else if(operacionEntrada == 'add')
        return 1;
    else if(operacionEntrada == 'ld')
        return 2;
    else if(operacionEntrada == 'sd')
        return 2;
    return -1;
}
function mainPrincipal(EntradaMain)
{
    let tipodeOperacionGlobal = 0;
    let [tipodeOperacion, direcciones] = divisionDelaFrases(EntradaMain);
    tipodeOperacionGlobal = detectarTipodeOperacpion(tipodeOperacion);
    console.log(tipodeOperacionGlobal);
    console.log(EntradaMain);
    console.log(tipodeOperacion);
    let direccionesporseparadoRecibidas, aux1,aux2;
    if (tipodeOperacionGlobal!=1)
    {

    [direccionesporseparadoRecibidas, aux1, aux2] = quitarlasXparaoperacionestipo2(direcciones)
    console.log(direccionesporseparadoRecibidas,aux1,aux2);
    let rs1 = convertBinario(aux2);
    let rd = convertBinario(direccionesporseparadoRecibidas);
    if(tipodeOperacion == 'ld')//evaluamos la operacionm ld.
        {
        let opcode = '0000011';
        let func3 = '011';
        let func12 = convertBinario(aux1);
        let binario = String(func12).padStart(12 , '0');
        const risc_v_binario = binario + rs1 + func3 + rd + opcode;
        escribir(risc_v_binario, EntradaMain);
        }
        else if (tipodeOperacion == 'sd') //evaluamos la operacionm sd.
        {
        let opcode = '0100011';
        let func3 = '011';
        let func12 = convertBinario(aux1);
        let binario = String(func12).padStart(12, '0');
        console.log(binario);
        console.log(binario.slice(1,7));
        console.log(binario.slice(7,12));
        const risc_v_binario = binario.toString().slice(0,7) + rd + rs1 + func3 + String(binario).slice(7,12) + opcode;
        console.log(risc_v_binario);
        escribir(risc_v_binario, EntradaMain);
        }
    }
    else{
        direccionesporseparadoRecibidas = quitarlasX(direcciones);
        let rs1 = convertBinario(direccionesporseparadoRecibidas[0])
        let rs2 = convertBinario(direccionesporseparadoRecibidas[1]);
        let rd = convertBinario(direccionesporseparadoRecibidas[2]);
        let opcode = asignarOpcode(tipodeOperacion);
        let func7 = asignarfunc7(tipodeOperacion);
        let func3 =asignarfunc3(tipodeOperacion);
        const risc_v_binario = func7 + rs2 + rs1 + func3 + rd + opcode;
        console.log(risc_v_binario);
        let risc_v_hexadecimal = convertHexa(risc_v_binario); //le asgnamos los resultados en binario para convertir a hexa
        escribir(risc_v_binario, EntradaMain);   
    }
    
}

function partiren4(riscv)

{
let aux = convertHexa(riscv.toString().slice(0,4));
let aux2 = convertHexa(riscv.toString().slice(4,8));
let aux3 = convertHexa( riscv.toString().slice(8,12));
console.log(aux,aux2,aux3);
let aux4 = convertHexa(riscv.toString().slice(12,16));
let aux5 = convertHexa(riscv.toString().slice(16,20));
let aux6 = convertHexa(riscv.toString().slice(20,24));
let aux7 = convertHexa(riscv.toString().slice(24,28));
let aux8 = convertHexa(riscv.toString().slice(28,33));
console.log(aux4, aux5, aux6, aux7, aux8);
const riscv_v_hexadecimal = aux + aux2 + aux3 + aux4 + aux5 + aux6 + aux7 + aux8;
console.log(riscv_v_hexadecimal);
return riscv_v_hexadecimal;
}

function escribir(riscv, CadenadeEntrada)

{
console.log(riscv);
let riscv_v_hexadecimal = partiren4(riscv);
document.getElementById('salida').innerHTML = "EL resultado es: x\""+riscv_v_hexadecimal+"\" Codigo ingresado fue:"+CadenadeEntrada;
}

function convertHexa(valorDeEntrada)

{
return Number(parseInt(valorDeEntrada,2)).toString(16);
}

function quitarlasXparaoperacionestipo2(direccionesRecibidas)

{
let auxDirecciones = direccionesRecibidas.split('x');
console.log(auxDirecciones);
let direccionessinX = auxDirecciones.join('');
let direccionesporSeparado = direccionessinX.split(',',3); //solo se pueden maximo 3 registros
let aux = direccionesporSeparado[1].split('(');
console.log("aux",aux);
let aux2 = aux[1].split(')');
console.log(aux2);
const recibidor1 = aux[0];
const recibidor2 = aux2[0]
console.log(direccionesporSeparado[0],recibidor1,recibidor2);
return [direccionesporSeparado[0],recibidor1, recibidor2];
}

function quitarlasX(direccionesRecibidas)
{
let auxDirecciones = direccionesRecibidas.split('x');
console.log(auxDirecciones);
let direccionessinX = auxDirecciones.join('');
let direccionesporSeparado = direccionessinX.split(',',3); //solo se pueden maximo 3 registros
console.log(direccionessinX);
console.log(direccionesporSeparado);
return direccionesporSeparado;
}

function asignarOpcode (operacionRecibida)
{
let opcode;
if(operacionRecibida == 'sub')
    opcode = '0110011';
else if(operacionRecibida == 'add')
    opcode = '0110011';
else if(operacionRecibida =='ld')
    opcode = '0000011';
else if(operacionRecibida== 'sd')
    opcode = '0100011';
 else
    opcode = 'xxxxxxx';
return opcode;
}

function asignarfunc3(operacionEntrada)

{
let func3;
if(operacionEntrada == 'sub')
    func3 = '000';
else if(operacionEntrada == 'add')
    func3 = '000';
return func3;
}

function asignarfunc7(operacionRecibida)

{
    let func7;
if(operacionRecibida == 'add')
    func7 = '0000000';
else if(operacionRecibida == 'sub')
    func7 = '0100000';

    return func7;
}

function convertBinario(x) 

{
let bin = 0;
let rem, i = 1;
while (x != 0) {
     rem = x % 2;
        
 x = parseInt(x / 2);
    bin = bin + rem * i;
     i = i * 10;
}
let binario = String(bin).padStart(5, '0');
return binario;
}

function obtenciondeCodigo()

{
let codigoRecibido = "";
codigoRecibido = document.getElementById('codigoensamblador').value;
mainPrincipal(codigoRecibido);
}

function borrar()

{
    document.getElementById('codigoensamblador').value = "";
    document.getElementById('salida').innerHTML = " "; 
}