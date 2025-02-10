const expenseForm=document.getElementById('expense-form');
const expenseList=document.getElementById('expenseList');

expenseForm.addEventListener("submit",function(eve){
    eve.preventDefault();
    const descp=document.getElementById("des").value;

    const catag=document.getElementById("catagory").value;

    const amount=document.getElementById("amount").value;

    if(document && catag && !isNaN(amount)){
       const newR=document.createElement('tr');
        newR.innerHTML=`<td> ${descp} </td> <td> ${catag} </td> <td> ${amount} </td>`;

        expenseList.appendChild(newR); 
    }
    else{
        alert("enter valid !!");
    }

})