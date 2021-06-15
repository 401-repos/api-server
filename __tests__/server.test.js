'use strinct';

require('@code-fellows/supergoose');
const Collection = require('../src/models/collection');
const foodModel = require('../src/models/clothes-schema.js');
const clothesModel = require('../src/models/clothes-schema.js');
const clothes = new Collection(clothesModel);
const foods = new Collection(foodModel);
const server = require('../src/server.js');
const test = require('supertest');
const {
    run
} = require('jest');
const testServer = test(server.app);

describe('Testing server', () => {

    let spyCons;
    beforeEach(() => {
        spyCons = jest.spyOn(console, 'log').mockImplementation();
        spyListen = jest.spyOn(server.app, 'listen').mockImplementation();
    });
    afterEach(() => {
        spyCons.mockRestore();
        spyListen.mockRestore();
    });
    it('should give status of 404 if route does not exsists', async () => {
        const test404 = await testServer.get('/bad');
        expect(test404.status).toEqual(404);
    });
    it('should give status of 201 new food created', async () => {
        const test201 = await testServer.post('/food').send({
            name: "Desiert",
            price: 50,
            discription:"Home made"
        });
        expect(test201.status).toEqual(201);
    });
    it('should give status of 201 new food created', async () => {
        const test201 = await testServer.post('/clothes').send({
            name: "bantaloon",
            price: 50,
            discription:"Out of stuck"
        });
        expect(test201.status).toEqual(201);
    });
    it('should give status of 404 if bad method', async () => {
        const test404 = await testServer.put('/');
        expect(test404.status).toEqual(404);
    });
    it('should give status of 200 if read clothes succeeded', async () => {
        const test200 = await testServer.get('/clothes');
        expect(test200.status).toEqual(200);
    });
    it('should give status of 200 if read food succeeded', async () => {
        const test200 = await testServer.get('/food');
        expect(test200.status).toEqual(200);
    });
    it('should give status of 204 if updated food succeeded', async () => {
        const arr = await foods.read();
        const id = arr[0]._id;
        const test204 = await testServer.put(`/clothes/${id}`).send({
            name: "carrots",
            discription:"Color orange"
        });
        expect(test204.status).toEqual(204);
    });
    it('should give status of 204 if updated clothes succeeded', async () => {
        const arr = await clothes.read();
        const id = arr[0]._id;
        const test204 = await testServer.put(`/food/${id}`).send({
            naem: "underwear",
            price:2
        });
        expect(test204.status).toEqual(204);
    });
    it('should give status of 204 if deleting food succeeded', async () => {
        const arr = await foods.read();
        const id = arr[0]._id;
        const test204 = await testServer.delete(`/clothes/${id}`);
        expect(test204.status).toEqual(204);
    });
    it('should give status of 204 if deleting clothes succeeded', async () => {
        await clothes.add({name:'bloza', discription:"new item" , price:70})
        const arr = await clothes.read();
        const id = arr[0]._id;
        const test204 = await testServer.delete(`/food/${id}`);
        expect(test204.status).toEqual(204);
    });
    it('should give status of 200 if read clothes with id succeeded', async () => {
        await clothes.add({name:'bloza', discription:"in stock", price: 30})
        const arr = await clothes.read();
        const id = arr[0]._id;
        const test200 = await testServer.get('/clothes/'+id);
        expect(test200.status).toEqual(200);
    });
    it('should give status of 200 if read food with id succeeded', async () => {
        const arr = await foods.read();
        const id = arr[0]._id;
        const test200 = await testServer.get('/food/'+id);
        expect(test200.status).toEqual(200);
    });

    it('should give status of 200 if route success of home', async () => {
        const testSuccess = await testServer.get('/');
        expect(testSuccess.status).toEqual(200);
    });
    it('should tell the function has been called', () => {
        const port = 0;
        server.run(port);
        expect(spyListen).toHaveBeenCalled();
    });
  
});
describe('Food Model', () => {
    it('can add new food', async () => {
        let food = {
            name: 'Lahmeh',
            discription: 'meat',
            price: 99
        };
        let addedFood = await foods.add(food);
        Object.keys(food).forEach(key => {
            if (parseInt(addedFood[key])) {
                expect(parseInt(addedFood[key])).toEqual(food[key]);
            } else {   
                expect(addedFood[key]).toEqual(food[key]);
            }
        });
    });
     it('Can Get All Foods', async () => {
         let food = {
             name: 'meat',
             discription: 'yummy',
             price: 10
         };
         let oldArr = await foods.read();
         await foods.add(food);
         await foods.add(food);
         let newArr = await foods.read();
         expect(newArr.length - oldArr.length).toEqual(2);
         expect(newArr.length - oldArr.length).toBeTruthy();
     });
     it('Can Get one Cloth', async () => {
         let arr = await foods.read();
         let id = arr[0]._id;
         const readRes = await foods.read(id);
         expect(readRes).toBeTruthy();
     });
     it('Can delete a Cloth', async () => {
         let oldArr = await foods.read();
         let id = oldArr[0]._id;
         const deleted = await foods.delete(id);
         let newArr = await foods.read();
         expect(oldArr.length - newArr.length).toEqual(1);
         expect(deleted).toBeTruthy();
     });
     it('Can update a Cloth', async () => {
         let arr = await foods.read();
         let id = arr[0]._id;
         const updateed = await foods.update(id, {
             name: 'milk',
             price: 5
         });
         expect(updateed).toBeTruthy();
         expect(parseInt(updateed["price"])).toEqual(5);
     });
     it('Can return by condition', async () => {
         let arr = await foods.readByCond({
             price: {
                 $gt: 10
             }
         });
         expect(arr.length).toBeTruthy();
     });
});
describe('clothes Model', () => {
    it('Can add new cloth', async () => {
        let cloth = {
            name: 'Bantaloon',
            discription: 'New in stock',
            price: 55
        };
        let addedCloth = await clothes.add(cloth);
        Object.keys(cloth).forEach(key => {
            if (parseInt(addedCloth[key])) {
                expect(parseInt(addedCloth[key])).toEqual(cloth[key]);
            } else {   
                expect(addedCloth[key]).toEqual(cloth[key]);
            }
        });
    });
    it('Can Get All Clothes', async () => {
        let cloth = {
            name: 'Bantaloon',
            discription: 'New in stock',
            price: 55
        };
        let oldArr = await clothes.read();
        await clothes.add(cloth);
        await clothes.add(cloth);
        let newArr = await clothes.read();
        expect(newArr.length- oldArr.length).toEqual(2);
        expect(newArr.length- oldArr.length).toBeTruthy();
    });
    it('Can Get one Cloth', async () => {
        let arr = await clothes.read();
        let id = arr[0]._id;
        const readRes = await clothes.read(id);
        expect(readRes).toBeTruthy();
    });
    it('Can delete a Cloth', async () => {
        let oldArr = await clothes.read();
        let id = oldArr[0]._id;
        const deleted = await clothes.delete(id);
        let newArr = await clothes.read();
        expect(oldArr.length - newArr.length).toEqual(1);
        expect(deleted).toBeTruthy();
    });
    it('Can update a Cloth', async () => {
        let arr = await clothes.read();
        let id = arr[0]._id;
        const updateed = await clothes.update(id, { name: 'bloza', price: 20 });
        expect(updateed).toBeTruthy();
        expect(parseInt(updateed["price"])).toEqual(20);
    });
    it('Can return by condition', async () => {
        let arr = await clothes.readByCond({
            price: {
                $gt: 10
            }
        });
        expect(arr.length).toBeTruthy();
    });
});