
export const updateObjectInArray = (items: Array<any>, itemId: any, objPropName:any, newObjProps: any) => {
    console.log(items)
   return  items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}