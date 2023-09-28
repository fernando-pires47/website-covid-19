module.exports = (conexaoSequelize, Sequelize,params) => {

    var where = '';

    console.log(params.dataref);
    if(params.dataref != "null"){
        where += "where dataref = $dataref ";

        if(params.cidade != "null"){
            where += "and cidade ilike $cidade ";
        }

        if(params.estado != "null"){
            where += "and estado = $estado ";
        }
    }else if(params.cidade != "null"){
        where += "where cidade ilike $cidade ";

        if(params.estado != "null"){
            where += "and estado = $estado ";
        }
    }else if(params.estado != "null"){
        where += "where estado = $estado ";
    }

    var ret = conexaoSequelize.query('select dataref,cidade,estado,totcasos,recuperados,mortos from cadastros ' + where, {
        nest: true,
        type: Sequelize.SELECT,
        bind: { dataref: params.dataref, cidade: (  "%" +params.cidade + "%"), estado: params.estado}
      });
    
    return ret;
}