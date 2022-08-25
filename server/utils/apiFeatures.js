class APIFeatures {
    //               
    //api/v1/product/keyword=laptop
    constructor(query,queryString){
        this.query = query;
        this.queryString=queryString;
    }
    search(){
        const keyword = this.queryString.keyword ?{
            name :{
                $regex: this.queryString.keyword,
                $options : 'i' //i-> case insensitive
            }
        }:{}
        //finding keyword
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        //copy query
        
        const queryCopy = {...this.queryString};
        // console.log(queryCopy)
        //Removing fields from the query
        //product?keyword=apple&category=laptop
        // so we need to remove keyword
        const removeFields = ['keyword','limit','page'] 
        removeFields.forEach(el=>delete queryCopy[el]) // remove 3 thing from querystring

        // console.log(queryCopy)
        //Advance filters for price, rating etc
        let queryString = JSON.stringify(queryCopy)
        //for lte to $lte
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, match =>`$${match}`)
        // console.log(queryString)
        
        this.query = this.query.find(JSON.parse(queryString))

        return this;

    }

    pagination(resPerPage){
        const currentPage = Number(this.queryString.page) || 1;  //take input like page=2
        const skip = resPerPage*(currentPage-1); //page 2 for 11 to 20 and 3 for 21 to 30 and so on...

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

module.exports = APIFeatures