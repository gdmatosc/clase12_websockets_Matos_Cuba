const { Router }=require('express');

const Container=require('../container');
const productos= new Container('productos.txt');


productos.init();

const router=Router();

router.get('/pug',(req,res)=>{
        res.render('testp.pug', { productosPug: productos.data});
       
})

router.get('/ejs',(req,res)=>{
    res.render('teste.ejs', { productos});
   
})


router.post('/',async(req,res)=>{
    const {titulo,rutaFoto,precio}=req.body;
    if(!titulo || !rutaFoto || !precio){
        return res.status(400).send({error: 'Los datos están incompletos'});
    }
    await productos.save({titulo,rutaFoto,precio});
    await productos.init();

    return res.send({message:'Producto agregado existosamente'})
})

router.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const {field,value}=req.body;
        await productos.editById(Number(id),field,value);
        res.send({message:`El producto con id ${id} se modificó exitosamente`})

    }catch(error){
        throw error
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        await productos.deleteById(Number(id));
        res.send({message:`El producto con id ${id} se borró exitosamente`})

    }catch(error){
        throw error
    }
})



module.exports=router;