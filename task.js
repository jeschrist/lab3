const _ = require('lodash');
const ut00 = require('./ut00');

function task1(){
    let students = ut00.csv_to_json('./csv/students.csv')
    console.log(_(students)
        .map(el => +el.age)
        .reduce((a,b) => a+b) / students.length
    )
}

function task2(groupName){
    let students = ut00.csv_to_json('./csv/students.csv')
    let groups = ut00.csv_to_json('./csv/groups.csv')
    
    let group_id = _(groups) 
    
        .filter(el => el.nameGr === groupName)
        .map(el => el.id)
        .value()[0]

    console.log(_(students)
        .filter(el => el.idGr == group_id)
        .map(el => +el.age)
        .reduce((a,b) => a+b) / Object.values(_(students)
                                    .filter(el => el.idGr == group_id)
                                    .countBy()
                                    .value())[0])
}

function task3(){
    let students = ut00.csv_to_json('./csv/students.csv')
    console.log(_(students)
        .filter(a => a.age >= 18)
        .value()
    )
}

function task4(groupName){
        let students = ut00.csv_to_json('./csv/students.csv')
        let groups = ut00.csv_to_json('./csv/groups.csv')
        
        let group_id = _(groups) 
        
            .filter(el => el.nameGr === groupName)
            .map(el => el.id)
            .value()[0]
    

        console.log(_(students)
            .filter(a => a.idGr == group_id && a.age >= 18)
            .value()
    )
}

function task5 (nameCurator, a){
    let students = ut00.csv_to_json('./csv/students.csv')
    let groups = ut00.csv_to_json('./csv/groups.csv')
    let curators = ut00.csv_to_json('./csv/curators.csv')

    let curators_id = _(curators)
        .filter(el => el.nameCur == nameCurator)
        .map(el => el.id)
        .value()[0]
    
    let group_id = _(groups) 
        .filter(el => el.idCur == curators_id) 
        .map(el => el.id)
        .value()[0]

    console.log(_(students)
        .filter(a => a.idGr == group_id)
        .orderBy(['nameSt'], [a])
        .value()
    )
}

function task6 (){
    let students = ut00.csv_to_json('./csv/students.csv')
    let merge = ut00.csv_to_json('./csv/merge.csv')
    let hobby = ut00.csv_to_json('./csv/hobby.csv')

console.table(_(merge) 
    .map (el => { return {'name': _(students)
                                            .filter(a => a.id == el.idStudent)
                                            .map(a => a.nameSt)
                                            .value()
    , 'hobby': _(hobby) 
                    .filter(a => a.id == el.idHobby)
                    .map(a => a.name)
                    .value()
    }})
    .orderBy(['name', 'hobby'], ['asc', 'desc'])
    .value()
    )
}

function task7 (){
    let students = ut00.csv_to_json('./csv/students.csv')
    let groups = ut00.csv_to_json('./csv/groups.csv')

    console.table(_(students)
    .map(el => {return {'name': el.nameSt,
    'groups': _(groups)
                .filter(a => a.id == el.idGr)            
                .map(a => a.nameGr)
                .value()[0]
    ,'age': el.age
        }})
    .orderBy(['groups','age'],['asc','desc'])
    .map(el => {return {'name': el.name, 'groups': el.groups}})
    .value()
    )
}

function task8 (hobbyName){
    let students = ut00.csv_to_json('./csv/students.csv')
    let merge = ut00.csv_to_json('./csv/merge.csv')
    let hobby = ut00.csv_to_json('./csv/hobby.csv')

    console.table(_(merge)
    .map(el => {return {'name': _(students) 
                                .filter(a => a.id == el.idStudent)
                                .map(a => a.nameSt)
                                .value()
                        ,'hobby': _(hobby)
                                .filter(a => a.id == el.idHobby)
                                .map(a => a.name)
                                .value()
    }})
    .filter(a => a.hobby == hobbyName)
    .map(el => el.name)
    .value()
    ) 
}


// task1()
// task2('ПИб-1')
// task3()
// task4('ПИнб-3')
// task5('Ухова', 'asc')
// task6()
// task7()
task8('бокс')