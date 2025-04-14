import React, { useState } from 'react'
import DescriptionTab from './DescriptionTab';
import SpecificationTab from './SpecificationTab';
import CommentsTab from './CommentTab';

const DetailsTab = ({product}) => {
    const [activeTab, setActiveTab] = useState("description");
    const tabs = [
	{ id: "description", label: "Mô tả sản phẩm"},
	// { id: "specification", label: "Thông số kĩ thuật"},
	{ id: "reviews", label: "Reviews"},
];
  return (
<div>
<div className='flex w-full gap-5  lg:px-[15rem] items-center '>
          {
            tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-2 transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "text-xl  font-semibold"
                    : "  text-neutral-600"
                }`}
              >
                {tab.label}
              </button>
            ))
          }

    </div>
    <div className='w-full h-auto px-6 lg:px-[15rem] py-10 text-justify border border-gray-200'>
          {activeTab === "description" && <DescriptionTab product={product}/>}
          {activeTab === "specification" && <SpecificationTab/>}
 		  {activeTab === "reviews" && <CommentsTab />}
        </div>
</div>
  )
}

export default DetailsTab

