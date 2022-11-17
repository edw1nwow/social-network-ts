import React from "react";
import ProfileStatus from "./ProfileStatus";
import {create}  from "react-test-renderer";
import {mockComponent} from "react-dom/test-utils";

describe("ProfileStatus component", ()=> {
    test("status from props should be in the state", () => {
    const component = create( <ProfileStatus status={"NetworkJS.com"} />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("NetworkJS.com")});

    test("after creation <input> should be displayed", () => {
        const component = create( <ProfileStatus status={"NetworkJS.com"} />);
        const root = component.root;
        expect(()=>{
        let input = root.findByType('input')}).toThrow()
    });

    test("after creation <span> should contains correct status", () => {
        const component = create( <ProfileStatus status={"NetworkJS.com"} />);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('NetworkJS.com')});

    test("input should be displayed in editMode instead of span", () => {
        const component = create( <ProfileStatus status={"NetworkJS.com"} />);
        const root = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('NetworkJS.com')});
    test("callback should be called", () => {
        const mockCallBack = jest.fn()
        const component = create( <ProfileStatus status={"NetworkJS.com"} updateStatus={mockCallBack} />);
        const instance = component.getInstance();
        instance.deActivateEditMode()
        expect(mockCallBack.mock.calls.length).toBe(1)});
});