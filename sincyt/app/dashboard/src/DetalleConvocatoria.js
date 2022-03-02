import React, {Component} from 'react';

import "./DetalleConvocatoria.css"
import clsx from 'clsx';

import 'rc-easyui/dist/themes/material/easyui.css';
import 'rc-easyui/dist/themes/icon.css';
import 'rc-easyui/dist/themes/react.css';
import Scrollbar from 'react-scrollbars-custom';
import { saveAs } from 'file-saver';
import * as axios from 'axios';
import * as mime from 'react-native-mime-types';

import {
}
from "react-bootstrap"

import {
    makeStyles,
    Grid,
    Button,
    Paper,
    CssBaseline,
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    CircularProgress,
    Backdrop,
    TextField,
    Modal,
    Fade
}
    from "@material-ui/core"

import {
    DataGrid,
    GridColumn
}
from 'rc-easyui';

import AspectRatio from '@material-ui/icons/AspectRatio';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const drawerWidth = 240;
const url_base = 'https://api.senacyt.gob.gt';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height:'100vh'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperModal: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        height : '50vh'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

const fixedHeightPaper = clsx(useStyles.paper, useStyles.fixedHeight);

function createData(nombre, descripcion) {
    return { nombre,descripcion };
}

export default class DetalleConvocatoria extends Component{

    aplicarConvocatoria = () => {
        window.open('https://e.senacyt.gob.gt')
    }

    constructor(props) {
        super(props);
        this.state = {
            informacionConvocatoria: undefined,
            volverConvocatoria: false,
            cargando: true,
            fechaInicio: 'cargando..',
            fechaFinal: 'cargando..',
            nombreConvocatoria : 'cargando..',
            numeroConvocatoria : 'cargando..',
            tematicas: [],
            detallePresentacion: '',
            detallePublico: '',
            detalleRequisitos: '',
            detalleResultados: '',
            detalleContacto: '',
            opcionesDatagrid: {
                pageSize: 20,
                pagePosition: "bottom",
                url : '',
                nowrap : "false"
            },
            dataContenidoGrid: [],
            dataContenidoProgramasLineas : [],
            modalAfiche : false,
            modalRequisitos : false,
            dataContenidoGridRequisitos : [],
            requisitoSeleccionado : null,
            estadoMenuRequisitos : true,
            estadoCargandoImagen : true,
            estadoDescargando : false
        };

        this.consultaInformacionConvocatoria();
        this.consultaInformacionLineasAsociadas();
        this.consultaInformacionTematicaRegistradas();
    }


    consultaInformacionTematicaRegistradas = () => {
        const url =  url_base + ':8080/apis/dash/informacionTematicaConvocatoria?id=' + this.props.convocatoria;
        const respuesta = fetch(url)
            .then((res) => { return res.json(); })
            .then((result) => {
                this.setState(state => ({
                        dataContenidoGrid: result,
                        opcionesDatagrid: {
                            pageSize: 10,
                            pagePosition: "bottom",
                            url : url,
                            nowrap : "false"
                        }
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            });
    };


    consultaInformacionLineasAsociadas = () => {
        const url =  url_base + ':8080/apis/dash/informacionLineaConvocatoria?id=' + this.props.convocatoria;
        const respuesta = fetch(url)
            .then((res) => res.json())
            .then((result) => {
                if(result != undefined && result.length > 0 ){
                    const valoresProgramas = [];
                    for(let contador = 0; contador < result.length; contador ++){
                        const lineasValores = [];
                        for(let lineas = 0; lineas < result[contador].lineas_asociadas.length; lineas ++){
                            lineasValores.push(
                                    <Paper style={{height:'auto', marginTop : '0.20rem'}} border={1} >
                                        <Typography align={"center"} style={{height:"auto", padding :'3px'}} variant={"body2"} >
                                            <Button fullWidth variant={"contained"} color={"primary"} size={"small"}>{result[contador].lineas_asociadas[lineas].acronimo}</Button>
                                            <Typography variant={"subtitle2"} style={{fontWeight:"bold"}}>{result[contador].lineas_asociadas[lineas].nombre}</Typography>
                                            <hr style={{marginTop:'-0.0rem'}}/>
                                            <Button variant={"contained"}
                                                    aria-controls={"simple-menu" + result[contador].lineas_asociadas[lineas].acronimo}
                                                    aria-haspopup={"true"}
                                                    size={"small"}
                                                    style={{backgroundColor:'darkcyan', color:'white', marginTop : '-0.5rem', marginBottom :'0.5rem'}}
                                                    onClick={ () => this.abrirModalRequisitos(result[contador].lineas_asociadas[lineas].id_linea) }
                                            >
                                                Requisitos
                                            </Button>
                                            <Typography variant={"body2"} align={"justify"} style={{fontSize:'11px', padding : '10px'}}>{ result[contador].lineas_asociadas[lineas].descripcion }</Typography>
                                        </Typography>
                                    </Paper>
                            );
                        }

                        const valor =
                            <Grid xs={6} md={6} lg={6} style={{height:'100%', width:'48%', minHeight : '100%'}} item>
                                <Paper className="paperDetallado" style={{backgroundColor:'white'}}>
                                    <Button fullWidth variant={"contained"} color={"secondary"}>{result[contador].acronimo_programa}</Button>
                                    <Scrollbar className="scrollPaperDetalle">
                                        <div style={{width:'100%', height : '100%'}} className={"container"}>
                                            {
                                                lineasValores
                                            }
                                        </div>
                                        <br/>
                                    </Scrollbar>
                                </Paper>
                            </Grid>
                        ;
                        valoresProgramas.push(valor);
                    }


                    this.setState(state => ({
                        dataContenidoProgramasLineas:  valoresProgramas
                    }));

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    consultaInformacionConvocatoria = () => {
        const url =  url_base + ':8080/apis/dash/informacionConvocatoria?id=' + this.props.convocatoria;
        const respuesta = fetch(url)
            .then((res) => res.json())
            .then((result) => {
                if(result.length === 1){
                    this.setState(state => ({
                        fechaInicio: result[0].fechaI,
                        fechaFinal: result[0].fechaF,
                        numeroConvocatoria: result[0].numero_convocatoria,
                        nombreConvocatoria : result[0].nombre,
                        detallePresentacion: result[0].tablero_presentacion,
                        detallePublico: result[0].tablero_publico_objetivo,
                        detalleRequisitos: result[0].tablero_requisitos,
                        detalleResultados: result[0].tablero_resultados,
                        detalleContacto: result[0].tablero_informacion_contacto,
                        detalleDiferenciaFechas : result[0].diferenciaFechas,
                        URLAfiche : result[0].url_afiche,
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    cerrarModal = () => {
        this.setState(state => ({
            modalAfiche: false
        }));
    };

    abrirModalRequisitos = (idLinea) => {
        const url =  url_base + ':8080/apis/dash/requisitosLineaAsociacionConvocatoria?linea=' + idLinea + "&convocatoria=" + this.props.convocatoria;
        fetch(url)
            .then((res) => res.json())
            .then((resultado)=>{
                console.log(resultado);
                this.setState(state => ({
                    modalRequisitos: true,
                    dataContenidoGridRequisitos : resultado
                }));
            });
    };

    cerrarModalRequisitos = () => {
        this.setState(state => ({
            modalRequisitos: false
        }));
    }

    mostrarAfiche = () =>{
        this.setState(state => ({
            modalAfiche: true
        }));
    };

    terminarMostrar = () =>{
        this.setState(state =>({
            estadoCargandoImagen : false
        }));
    };

    descargarRequisito = ( identificador, abreviatura ) => {
        this.setState(state => ({
            estadoDescargando: true
        }))
        const url = url_base + ':8080/apis/fsadm/download?id=' + identificador;
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            const extension = mime.extension(response.data.type);
            saveAs(new Blob([response.data]), abreviatura + '.' + extension);
            this.setState(state => ({
                estadoDescargando: false
            }))
        });
    }

    render(){
        return(
            <div className="divTableroDetalle" align={'center'} id={"detalleConvocatoriasDIV"} >
                <div className="divPrincipalDetalles">
                    <CssBaseline/>
                    <main className={useStyles.content} style={{height: '100%'}}>
                        <div className={useStyles.appBarSpacer}/>
                        <Grid container spacing={1} style={{height: 'auto', flexGrow: "1"}} direction={"row"} justify={"center"}>

                            <Grid item xs={12} sm={12} md={8} lg={4} style={{minHeight: '33vh', height:'auto'}}>
                                <Paper style={{ minHeight: '100%', height : "auto", textAlign: 'left', width:'100%'}} >
                                    <div style={{ width : '100%', minHeight :'100%', height : 'auto', backgroundColor : 'transparent'}} align={'center'}>
                                        <Button fullWidth style={{backgroundColor : '#1e3684', color :'white'}} variant={"contained"}>INFORMACIÓN DE LA CONVOCATORIA</Button>
                                        <br/>
                                        <br/>
                                        <TextField style={{minWidth : '90%', width:'auto'}} size={"small"} variant={"outlined"} InputLabelProps={{ shrink: true }} InputProps={{ readOnly :true, style:{textAlign:"center"}}} value={ this.state.detalleDiferenciaFechas } label="DIAS RESTANTES:" inputProps={{ style : { textAlign : "center", fontSize : 12}}}/><br/>
                                        <br/>
                                        <TextField style={{minWidth : '90%', width:'auto'}} size={"small"} variant={"outlined"} InputLabelProps={{ shrink: true }} InputProps={{ readOnly :true, style:{textAlign:"center"}}} value={this.state.nombreConvocatoria} label="NOMBRE DE LA CONVOCATORIA" inputProps={{ style : { textAlign : "center", fontSize : 15, fontWeight : "bold"}}}/><br/>
                                        <br/>
                                        <TextField style={{minWidth : '90%', width:'auto'}} size={"small"} variant={"outlined"} InputProps={{ readOnly :true, style :{textAlign:"center"} }}  value={this.state.fechaInicio} label="FECHA INICIO:"  inputProps={{ style : {textAlign:"center", fontSize : 12}}}/><br/>
                                        <br/>
                                        <TextField style={{minWidth : '90%', width:'auto'}} size={"small"} label="FECHA FINAL:" variant={"outlined"} value={this.state.fechaFinal} InputProps={{ readOnly :true, style :{textAlign:"center"} }} inputProps={{ style : {textAlign:"center", fontSize : 12}}}/><br/>
                                        <br/>
                                    </div>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} lg={2} style={{minHeight: '33vh', height : 'auto'}}>
                                <Paper style={{ minHeight:'100%', height :'auto'}} >
                                    <Button fullWidth  style={{backgroundColor : '#1e3684', color :'white'}} variant={"contained"}>ACCIONES</Button>
                                    <hr style={{marginTop: '-0.35rem'}}/>
                                    <TextField fullWidth style={{minWidth : '90%', width:'auto',marginBottom: '5px', fontWeight : "bold"}} value={ this.state.numeroConvocatoria }  InputLabelProps={{ shrink: true }} size={"small"} label="CONVOCATORIA:" variant={"outlined"} InputProps={{ readOnly :true, style :{textAlign:"center", fontWeight :'bold'} }} inputProps={{ style : {textAlign:"center", fontSize : 12}}}/>
                                    <hr/>
                                    <Button style={{width: '90%', marginBottom: '5px',  color :'white', backgroundColor :'darkcyan'}} variant={"contained"} color={"default"} onClick={this.aplicarConvocatoria}>
                                        APLICAR
                                    </Button>
                                    <Button  style={{width: '90%', marginBottom: '5px', color:'#1e3684' }} variant={"contained"} color={"default"} href="/">
                                        VOLVER
                                    </Button>
                                    <Button
                                        style={{width: '90%', marginBottom: '5px', color:'#1e3684' }}
                                        variant="contained"
                                        color="default"
                                        onClick={this.mostrarAfiche}
                                        startIcon={<AspectRatio />}
                                    >
                                        Afiche
                                    </Button>
                                    <br/>
                                    <br/>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} lg={6}  style={{minHeight: '33vh', backgroundColor: 'transparent'}}>
                                <Grid container spacing={0} style={{ height: '90%', minHeight : '100%', width: '100%', overflowX : "scroll", backgroundColor : 'lightgray', borderRadius :'5px'}} direction={"column"} justify={"space-around"} alignItems={"stretch"} >
                                    { this.state.dataContenidoProgramasLineas }
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} lg={6} style={{ height: '51vh', minHeight : '51vh' }} >
                                {/*<Scrollbar style={{width : '100%', height : '100%'}}>*/}
                                    <Paper className={fixedHeightPaper} style={{height: '100%', minHeight:'100%'}}  >
                                        <Button fullWidth color={"default"} style={{backgroundColor : '#1e3684', color :'white'}} variant={"contained"}>INFORMACIÓN DE LA CONVOCATORIA</Button>
                                        <br/>
                                        <Scrollbar className="scrollBarInformacionConvocatoria">
                                            <ExpansionPanel
                                            >
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{backgroundColor : '#ececec'}}
                                                >
                                                    <Typography className={useStyles.heading} style={{fontWeight: "bold", textAlign:"left"}} variant={"caption"}><ArrowRightIcon/> PRESENTACIÓN </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography align={"justify"} variant={"caption"} style={{width:'100%'}}>
                                                        <div style={{width:'100%'}} dangerouslySetInnerHTML={{ __html: this.state.detallePresentacion }}/>
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>

                                            <ExpansionPanel>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{backgroundColor : '#ececec'}}
                                                >
                                                    <Typography className={useStyles.heading} style={{fontWeight: "bold"}} variant={"caption"}><ArrowRightIcon/> PÚBLICO OBJETIVO</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography align={"justify"} variant={"caption"} style={{width:'100%'}}>
                                                        <div  style={{width:'100%'}} dangerouslySetInnerHTML={{__html:this.state.detallePublico}}/>
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>

                                            <ExpansionPanel>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{backgroundColor : '#ececec'}}
                                                >
                                                    <Typography className={useStyles.heading} style={{fontWeight: "bold"}} variant={"caption"}><ArrowRightIcon/> REQUISITOS</Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography align={"justify"} variant={"caption"} style={{width:'100%'}}>
                                                        <div style={{width:'100%'}}  dangerouslySetInnerHTML={{__html:this.state.detalleRequisitos}}/>
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>

                                            <ExpansionPanel>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{backgroundColor : '#ececec'}}
                                                >
                                                    <Typography className={useStyles.heading} style={{fontWeight: "bold"}} variant={"caption"}><ArrowRightIcon/> RESULTADOS </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography align={"justify"} variant={"caption"} style={{width:'100%'}}>
                                                        <div style={{width:'100%'}}  dangerouslySetInnerHTML={{__html:this.state.detalleResultados}}/>
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>

                                            <ExpansionPanel>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{backgroundColor : '#ececec'}}
                                                >
                                                    <Typography className={useStyles.heading} style={{fontWeight: "bold"}} variant={"caption"}><ArrowRightIcon/> BITACORA </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography align={"justify"} variant={"caption"} style={{width:'100%'}}>
                                                        <b>Fecha Inicio:</b> { this.state.fechaInicio } <br/>
                                                        <b>Fecha Final :</b> { this.state.fechaFinal } <br/>
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>

                                            <ExpansionPanel>
                                                <ExpansionPanelSummary
                                                    expandIcon={<ExpandMoreIcon/>}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    style={{backgroundColor : '#ececec'}}
                                                >
                                                    <Typography className={useStyles.heading} style={{fontWeight: "bold"}} variant={"caption"}><ArrowRightIcon/> INFORMACIÓN DE CONTACTO </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails>
                                                    <Typography align={"justify"} variant={"caption"} style={{width:'100%'}}>
                                                        <div style={{width:'100%'}}  dangerouslySetInnerHTML={{__html:this.state.detalleContacto}}/>
                                                    </Typography>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>

                                        </Scrollbar>

                                    </Paper>
                                {/*</Scrollbar>*/}
                            </Grid>

                            <Grid item xs={12} sm={12} md={8} lg={6} style={{minHeight: '51vh', height: '51vh'}}>
                                <Paper className={fixedHeightPaper} style={{minHeight: '100%', height:'100%'}}  >
                                    <Button fullWidth style={{backgroundColor : '#1e3684', color :'white'}} variant={"contained"}>TEMATICAS</Button>
                                    <br/>
                                    <DataGrid
                                        className="scrollBarInformacionConvocatoria"
                                        {...this.state.opcionesDatagrid}
                                        data={this.state.dataContenidoGrid}
                                        url={this.state.opcionesDatagrid.url}
                                        pagination
                                        rowColumns
                                    >
                                        <GridColumn field="rn" align="center" width="30px"
                                                    cellCss="datagrid-td-rownumber"
                                                    render={({rowIndex}) => (
                                                        <span>{rowIndex+1}</span>
                                                    )}
                                        />
                                        <GridColumn field="tematica" title="Temática" style={{textAlign:'center'}}/>
                                        <GridColumn field="descripcion" title="Descripción" style={{textAlign:'center'}}/>
                                    </DataGrid>

                                </Paper>
                            </Grid>
                        </Grid>
                        {/*}</Container>*/}
                        <br/>
                        <br/>
                    </main>
                </div>

                <Modal
                    style={{display : 'flex', alignItems : "center", justifyContent : "center"}}
                    className={useStyles.modal}
                    onClose={this.cerrarModal}
                    open={this.state.modalAfiche}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.modalAfiche} >
                        <div style={{maxWidth:'100%', maxHeight:'100%'}} align={'center'}>
                            { this.state.estadoCargandoImagen && <CircularProgress style={{  color : 'orange' }} value={100}/> }
                            <Button variant={"contained"} color={"primary"} size={"small"} style={{maxWidth:'100%', fontSize : '10px'}} onClick={this.cerrarModal}>Cerrar</Button><br/>
                            <Button variant={"contained"} color={"secondary"} size={"small"} style={{maxWidth:'100%', fontSize : '8px'}}>(Presione la imagen para ajustar la visualización) </Button>
                            <br/>
                            <Zoom align={'center'} zoomMargin={40}>
                                <img src={ url_base + ':8080/apis/fsadm/download?id=' + this.state.URLAfiche} onLoad={ this.terminarMostrar }/>
                            </Zoom>
                            <br/>
                        </div>
                    </Fade>
                </Modal>
                <Modal
                    style={{display : 'flex', alignItems : "center", justifyContent : "center", height :'100%', width : '100%'}}
                    className={useStyles.modal}
                    onClose={this.cerrarModalRequisitos}
                    open={this.state.modalRequisitos}
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={this.state.modalRequisitos} style={{ height :'30vh', width : 400}}>
                        <div style={{ height:'30vh', backgroundColor :'white'}} align={"center"}>
                            <Button fullWidth variant={"outlined"}>Registros</Button>
                            <br/>
                            <DataGrid
                                pagination
                                virtualScroll
                                selectionMode="single"
                                onSelectionChange={(selection) => { this.setState( state => ({ requisitoSeleccionado: selection })); console.log(selection)}}
                                data={this.state.dataContenidoGridRequisitos}
                                style={{width : '100%', height : '26vh'}}
                            >
                                <GridColumn field="rn" align="center" width="30px"
                                            cellCss="datagrid-td-rownumber"
                                            render={({rowIndex}) => (
                                                <span>{rowIndex+1}</span>
                                            )}
                                />
                                {/*<GridColumn field="id_mongo" title="Identificador" hidden="true" style={{textAlign:'center'}}/>*/}
                                <GridColumn field="descripcion" title="Tipo Documento" style={{textAlign:'center'}}/>
                            </DataGrid>
                            <Button variant={"text"} fullWidth color={"secondary"} size={"small"} style={{maxWidth:'100%', fontSize : '8px', backgroundColor : 'whitesmoke', color : 'black'}}>Seleccione y presione descargar <br/>(Presione afuera de la imagen para cerrar la visualización) </Button>
                            { this.state.estadoDescargando && (<CircularProgress style={{  color : 'greenyellow' }} value={100}/> )}
                            <br/>
                            <Button variant={"contained"} size={"small"} style={{maxWidth : '80%', fontSize : '10px'}} color={"secondary"} onClick={ () => { if(this.state.requisitoSeleccionado != null ){ this.descargarRequisito(this.state.requisitoSeleccionado.id_mongo,this.state.requisitoSeleccionado.abreviatura )} }}>Descargar</Button>
                        </div>
                    </Fade>
                </Modal>
            </div>
        )
    }
}