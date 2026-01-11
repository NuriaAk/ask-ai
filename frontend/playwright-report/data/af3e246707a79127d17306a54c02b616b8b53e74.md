# Page snapshot

```yaml
- generic [ref=e2]:
  - region "Notifications (F8)":
    - list
  - region "Notifications alt+T"
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "AgentQ" [ref=e6] [cursor=pointer]:
          - /url: /
          - img [ref=e8]
          - generic [ref=e15]: AgentQ
        - paragraph [ref=e16]: Your friendly AI agents guide
    - main [ref=e17]:
      - generic [ref=e18]:
        - generic [ref=e19]:
          - button "Go back" [ref=e20] [cursor=pointer]:
            - img [ref=e21]
          - generic [ref=e24]:
            - heading "Explorer Mode" [level=2] [ref=e25]
            - paragraph [ref=e26]: Simple, friendly explanations
          - button "Switch mode" [ref=e27] [cursor=pointer]
        - generic [ref=e28]:
          - generic [ref=e29]:
            - img [ref=e31]
            - generic [ref=e36]: First question
          - generic [ref=e37]:
            - img [ref=e39]
            - generic [ref=e48]: "GraphRAG response (simple): AI agents perceive inputs, reason about goals, and take actions through tools or workflows. They combine a reasoning engine, memory, and tool access to complete tasks. Ask another question and I will keep it friendly and clear."
        - generic [ref=e49]:
          - generic [ref=e50]:
            - 'textbox "Ask a question like: What is an AI agent?" [ref=e51]'
            - button "Send message" [disabled] [ref=e52]:
              - img [ref=e53]
          - paragraph [ref=e56]: Press Enter to send • Shift + Enter for new line
```