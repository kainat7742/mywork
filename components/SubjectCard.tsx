type Props = {

title:string

icon:string

}

export default function SubjectCard({title,icon}:Props){

return(

<div className="bg-white rounded-2xl p-6 text-center shadow-sm">

<div className="text-3xl">

{icon}

</div>

<h4 className="mt-4 font-semibold">

{title}

</h4>

</div>

)

}