/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react"
import ReactFlow, { Controls, Background, MiniMap, applyNodeChanges, OnNodesChange, Node, NodeTypes } from "reactflow"
import "../../App.css"
import { handleDragOver, ResizableNodeSelected } from "../../utils"
// import Plyr from "plyr";

// Define the initial nodes for the React Flow component
const initialNodes: Node[] = [
  {
    id: "1",
    data: { label: "You can drag and drop your images and Videos here." },
    position: { x: 0, y: 0 },
    type: "input",
  },
]

const nodeTypes: NodeTypes = {
  ResizableNodeSelected,
}

//* Define the NodeEditor component
const NodeEditor: React.FC = () => {
  // State to store nodes and media items
  const [nodes, setNodes] = useState<Node[]>(initialNodes)

  //* Function to handle drop of media files into React Flow
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const files = event.dataTransfer.files

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (file.type.startsWith("image/")) {
        //? Handle image file as a new node
        const imageUrl = URL.createObjectURL(file)
        const newNode = {
          id: `image-node-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: { label: <img src={imageUrl} alt={`Image`} /> },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: any) => [...prevNodes, newNode])
      } else if (file.type.startsWith("video/")) {
        //? FIXME: Handle video file as a new node
        // const videoUrl = URL.createObjectURL(file);
        const newNode = {
          id: `video-node-${Date.now()}`,
          type: "ResizableNodeSelected",
          data: {
            label: (
              <div>
                <video controls playsInline className="w-full h-full">
                  <source src="https://www.youtube.com/watch?v=nLQ-9vfEjUI" type={file.type} />
                </video>
              </div>

              // <Plyr />
              // <Plyr/>
            ),
          },
          position: { x: event.clientX - 100, y: event.clientY - 100 },
        }
        setNodes((prevNodes: any) => [...prevNodes, newNode])
      }
    }
  }

  const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), [])

  return (
    <div className="h-full col-span-12">
      <div className="h-full flex flex-col justify-center items-center" onDrop={handleDrop} onDragOver={handleDragOver}>
        {/* React Flow component */}
        <ReactFlow nodes={nodes} nodeTypes={nodeTypes} onNodesChange={onNodesChange} onConnect={() => {}} fitView snapToGrid={true} snapGrid={[15, 15]}>
          <Background />
          <Controls className="bg-gray-300" />
          <MiniMap className="scale-[.65] lg:scale-[.80] 2xl:scale-100 bg-neutral-content" />
        </ReactFlow>
      </div>
    </div>
  )
}

export default NodeEditor
