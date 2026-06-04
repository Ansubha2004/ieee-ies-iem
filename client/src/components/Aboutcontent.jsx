import React from 'react'

function Aboutcontent() {

    const scrollTo=(id)=>{
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

    return (
        <div className="hidden border-solid border-[2px] border-amber-600 h-fit md:flex flex-col min-w-[20%] box-border bg-white sticky md:top-[150px] lg:top-[190px]">
            <div id="heading" className="bg-amber-600 px-3 py-2.5 text-white section-label">Content</div>
            <div className="p-2">
                <ol className="flex flex-col gap-1">
                    <li>
                        <button onClick={() => scrollTo("#About")} className="animatedbutton2 ">About the chapter</button>
                    </li>
                    <li>
                        <button onClick={() => scrollTo("#Mission")} className="animatedbutton2"> Mission </button>
                    </li>
                    <li>
                        <button onClick={() => scrollTo("#Vision")} className="animatedbutton2"> Vision </button>
                    </li>
                    <li>
                        <button onClick={() => scrollTo("#Membership")} className="animatedbutton2"> Membership Details </button>
                    </li>
                    <li>
                        <button onClick={() => scrollTo("#Benifits")} className="animatedbutton2"> Membership Benifits </button>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default Aboutcontent